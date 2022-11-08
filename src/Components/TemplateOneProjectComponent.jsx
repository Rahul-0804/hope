import { Container } from "@mui/system";
import React from "react";
import "../Styles/TemplateOneProjectComponent.css";

const TemplateOneExperienceComponent = (props) => {
  return (
    <Container className="template-one-project-comp">
        <div className="template-one-project-comp__upper">
            <li>
                <h3 className="template-one-project-comp_name">{props.project.projectName}</h3>
                <h4 className = "template-one-project-comp_month">{props.project.projectMonth}-{props.project.projectYear}</h4>
            </li>
        </div>
        <div className="template-one-project-comp__lower">
            <p className="template-one-project-comp_description">{props.project.projectDescription}</p>
            <li className="template-one-project-comp__lower__link"><a href={props.project.projectLink} target="_blank" rel="noreferrer">Link</a></li>
        </div>
    </Container>
  );
};

export default TemplateOneExperienceComponent;
