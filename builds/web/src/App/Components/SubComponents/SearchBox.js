//Import react
import React from "react";

//Import react components
import {Card, InputGroup, FormControl, Button, Dropdown, ToggleButton} from "react-bootstrap"

export class SearchBox extends React.Component{
    constructor(props){
        //Give parent properties
        super(props);

        //Setup Parent
        this.Parent = props.Parent;

        //Setup self reference
        this.Parent.SearchBox = this;

        //Build tag system 
        this.FilteredTags = null;
        this.SelectedTags = [];

        //Build tag section
        let Data         = window.App.OrgData;
        let UnOrgTags    = [];
        let FilteredTags = []

        //Get all tags
        let Id = 0;
        for(var Orgs in Data){
            let Org = Data[Orgs];
            
            //Push updated tags into tag list
            for(var Tags in Org.tags){
                UnOrgTags.push({"tag" : Org.tags[Tags].tag, "color": Org.tags[Tags].color, "Id" : Id});
                Id++;
            }
        }

        //Filter Tags
        for(var OldTags in UnOrgTags){
            let OldTag = UnOrgTags[OldTags];
            let Unique = true;

            //Check new tags to see if this old one is in there
            for(var NewTags in FilteredTags){
                let NewTag = FilteredTags[NewTags];

                //If the new tag is in there, disregard it
                if(NewTag.name == OldTag.name && NewTag.color == OldTag.color){
                    Unique = false;
                }
            }

            //New tag can be pushed since it's unique 
            if(Unique){
                FilteredTags.push(OldTag);
            }
        }

        //Save tags
        this.FilteredTags = FilteredTags;
    
    }

    //Render loop
    render(){
        //Get list of tags
        let TagList = []
        for(var Id = 0; Id < this.FilteredTags.length; Id++){
            let Tag = this.FilteredTags[Id];

            //Add Tags as a drop down menu element
            TagList.push(
                <Dropdown.Item eventKey={Id} onSelect={(EventKey, Event) => {
                    this.SelectTag(EventKey)
                }}>
                    {Tag.tag}
                </Dropdown.Item>
            )
        }

        //Check to see if we're filtering by tags now
        let SelectedTags = []
        let Body = []

        //If we have tags to sort through
        if(this.SelectedTags.length != 0){
            //For each of the selected tags, make an elem
            for(var Tags in this.SelectedTags){
                let Tag    = this.SelectedTags[Tags];
                let NewTag = this.CreateSelectedTag(Tag, this.SelectedTags.indexOf(Tag));
                SelectedTags.push(NewTag);
            }

            Body.push(
                <Card style={{marginTop: "2em", maxwidth: "90%", maxHeight : "40%", overflowY: "auto", marginLeft: "5%"}}>
                    <Card.Title style={{marginTop: "1em", marginBottom:"1em", sticky: "top"}}>Selected Tags</Card.Title>
                    <Card.Body>
                        {SelectedTags}
                    </Card.Body>
                </Card>
                
            )
        }

        //Before render set global vars
        window.App.SelectedTags = this.SelectedTags

        //Return basic body
        return(
            <Card style={{width: "30%"}}>
                <Card.Body>
                    {/** Header **/}
                    <Card.Title>Search</Card.Title>

                    {/** Search **/}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                        />
                        <InputGroup.Prepend>
                            <Button 
                                variant="outline-success" 
                                onClick={() => {
                                    //On Search reload search box
                                    this.Parent.ResultsBox.setState({"loading" : true});
                                }}>
                                Search
                            </Button>
                        </InputGroup.Prepend>
                    </InputGroup>

                    {/** Type Drop Down **/}
                    <Dropdown style={{marginTop: "3em"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Search By Tag
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{height: "20rem", overflowY: "scroll"}}>
                            {TagList}
                        </Dropdown.Menu>
                    </Dropdown>

                    {Body}

                </Card.Body>
            </Card>
        )
    }


    //When a tag is selected this function is fired
    SelectTag(TagId){
        //Fetch Tag
        let Tag = this.FilteredTags[TagId];

        //Pop Tag out of queue
        let NewTagList = [];

        //For all old tags
        for(var x = 0; x < this.FilteredTags.length; x++){
            //If it's not the current tag, remove
            if(x != TagId){
                NewTagList.push(this.FilteredTags[x]);
            }
        }

        this.FilteredTags = NewTagList;

        //Pop Tag into new list
        this.SelectedTags.push(Tag);
        
        this.setState({update: true});
        this.Parent.ResultsBox.SortBy(this.SelectedTags);
    
    }

    //Unselect a tag
    UnSelectTag(TagId){
        //Fetch tag
        let Tag = this.SelectedTags[TagId];

        //Remove tag from selected list
        let NewSelectedTags = []
        for(var Id = 0; Id < this.SelectedTags.length; Id++){
            //If not the tag we're removing, push
            if(Id != TagId){
                NewSelectedTags.push(this.SelectedTags[Id]);
            }
        }

        //Update selected
        this.SelectedTags = NewSelectedTags

        //Push the tag back into the list
        NewSelectedTags = []
        
        //For old tags | 
        for(var Id = 0; Id < this.FilteredTags.length; Id++){
            //If not the tag we're removing, push
            if(Id == Tag.Id){
                NewSelectedTags.push(Tag);
            }
            
            NewSelectedTags.push(this.FilteredTags[Id]);
        }

        this.FilteredTags = NewSelectedTags;

        //Update the state
        this.setState({update: true});
        this.Parent.ResultsBox.SortBy(this.SelectedTags);
    
    }


    //Creates a selected tag element
    CreateSelectedTag(TagInfo, TagId){
        return(
            <div>
                <div className="float-left">
                        <Button 
                            style={{
                                margin: "0.5em",
                                borderRadius: "10px"
                            }}
                            className="btn btn-outline-danger btn-light"
                            id={TagId} 
                            onClick={(event) => {this.UnSelectTag(event.target.id);}}>
                         {TagInfo.tag}
                        </Button>
                </div>
            </div>
        )
    }

}