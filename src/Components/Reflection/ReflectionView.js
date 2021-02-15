import React, { Component } from "react";
import Context from "../../Context";
import Reflection from "./Reflection";

export default class ReflectionView extends Component {
    static contextType = Context;


	render(){
        const reflectionId = parseInt(this.props.match.params.id);
        console.log(this.context.reflections)
        const reflection = this.context.reflections.find(r => r.id === reflectionId)
        console.log(reflection)

        if(!reflection){
            return '';
        }

		return (<div key={reflection.id}>
                <Reflection
				id={reflection.id}
				title={reflection.title}
				image_url={reflection.image_url}
				description={reflection.description}
				feeling={reflection.feeling}
				content={reflection.content}
				dateCreated={reflection.datecreated}
                history={this.props.history}
			/>
            </div>);
	}
}
