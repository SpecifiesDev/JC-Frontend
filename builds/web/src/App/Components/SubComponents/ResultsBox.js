//Import react
import React from "react";

//Import React Components
import {Table} from "react-bootstrap";

export class ResultsBox extends React.Component{
    //P useless construct but o well
    constructor(props){
        //Give parent properties
        super(props);

        //Setup Parent
        this.Parent = props.Parent;

        //Setup children
        this.Parent.ResultsBox = this;

        //Setup display list
        this.DisplayList = window.App.OrgData

    }

    //Render
    render(){
        let ResultsList = [];

        //For each Org, create an org block
        for(var Orgs in this.DisplayList){
            let Org = this.DisplayList[Orgs];

            ResultsList.push(
                this.CreateTableRow(Org)
            )
        }

        return(
            <div className="flex" style={{width: "75%",overflowY: "scroll"}}>
                <Table striped bordered hover className="header-fixed">
                    <thead> 
                        <tr>
                            <th>Organization Name</th>
                            <th>Tags</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody style={{overflowY: "scroll"}}>
                        {ResultsList}
                    </tbody>
                </Table>
            </div>
        )
    }

    //Create a row
    CreateTableRow(Org){
        //Get Tags
        let TagList = ""

        for(var Tags in Org.tags){
            let Tag = Org.tags[Tags];

            TagList += Tag.tag + ", "; 
        }

        //Trim off the last ", "
        TagList = TagList.substring(0, TagList.length - 2);

        //Return Row
        return(
            <tr>
                <td>{Org.name}</td>
                <td>{TagList}</td>
                <td>{Org.description}</td>
            </tr>

        )
    }

    //Called by ./SearchBox function UnSeclectTag and SelectTag
    //On Select, sort the box based on tag
    SortBy(SelectedTags){
        //If there are no tags to sort by, reset to default
        if(SelectedTags.length == 0){
            this.DisplayList = window.App.OrgData;
            this.setState({loading: true})
            return;
        }    

        //Sort by tags
        let NewOrgList = []

        for(var Orgs in this.DisplayList){
            let Org = this.DisplayList[Orgs];

            let HasTag = false;

            //Check to see if any tag in tag list
            //Matches list in SelectedTags
            for(var Tags in Org.tags){
                let Tag = Org.tags[Tags];

                for(var SelTags in SelectedTags){
                    let SelTag = SelectedTags[SelTags];

                    //The org has one of the selected tags
                    if(SelTag.name == Tag.name && SelTag.color == Tag.color){
                        HasTag = true;
                    }
                }
            }

            if(HasTag){
                NewOrgList.push(Org)
            }

        }

        //Finalize new Display List
        this.DisplayList = NewOrgList

        //Force a re render
        this.setState({loading: true})

    }
}