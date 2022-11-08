import { Button, Divider, MenuItem, Paper, Select } from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import BackNextBtnComponent from "./BackNextBtnComponent";
import { addAllProjects, addProject } from "../Redux/actions";
import { useForm, Controller } from "react-hook-form";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import "../Styles/ProjectComponent.css";


const mapStateToProps = (state) => ({
  projects: state.projectReducer.projects,
});

const mapDispatchToProps = (dispatch) => ({
  setProject: (project) => dispatch(addProject(project)),
  setAllProjects: (projects) => dispatch(addAllProjects(projects)),
});

const years = [
  "2030",
  "2029",
  "2028",
  "2027",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
  "2004",
  "2003",
  "2002",
  "2001",
  "2000",
  "1999",
  "1998",
  "1997",
  "1996",
  "1995",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ProjectComponent = (props) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleBack = () => {
    props.setTab(props.tab - 1);
  };

  const handleNext = (data) => {
    console.log(data);
    setLoading(true);

    let projectOne = {};
    let projectTwo = {};

    for (let index in data) {
      console.log(index.slice(0, index.length));
      if (index.includes("1")) {
        projectOne[index.slice(0, index.length - 1)] = data[index];
      } else {
        projectTwo[index.slice(0, index.length - 1)] = data[index];
      }
    }

    console.log(projectOne, projectTwo);

    if (Object.keys(projectTwo).length) {
      props.setAllProjects([
        { ...projectOne, id: 1 },
        { ...projectTwo, id: 2 },
      ]);
    } else {
      props.setAllProjects([{ ...projectOne, id: 1 }]);
    }

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  console.log(props.projects, errors);

  const addNewProject = () => {
    props.setProject({
      id: props.projects.length + 1,
      projectName: "",
      projectDescription: "",
      projectLink: "",
      projectMonth: "",
      projectYear: "",
    });
  };

  const editProjectName = (value, id) => {
    const newProjects = props.projects.map((project) => {
      if (project.id === id) {
        return { ...project, projectName: value };
      } else return project;
    });

    props.setAllProjects(newProjects);
  };

  const editProjectDescription = (value, id) => {
    const newProjects = props.projects.map((project) => {
      if (project.id === id) {
        return { ...project, projectDescription: value };
      } else return project;
    });

    props.setAllProjects(newProjects);
  };

  const editProjectLink = (value, id) => {
    const newProjects = props.projects.map((project) => {
      if (project.id === id) {
        return { ...project, projectLink: value };
      } else return project;
    });

    props.setAllProjects(newProjects);
  };

  return (
    <Paper className="project-paper" elevation={3}>
      <h1 className="project-main-heading">Project Details</h1>
      <form onSubmit={handleSubmit(handleNext)}>
        {props.projects.map((project) => {
          return (
            <div key={project.id} className="project-cont">
              <h3 className="project-heading">Project{project.id}</h3>
              <Divider sx={{ margin: "5px 0px" }} />
              <div className="project-form-cont">
                <InputComponent
                  title="Project Name"
                  type={"text"}
                  name={`projectName${project.id}`}
                  register={register}
                  // error={errors[`projectName${project.id}`]}
                  helperText="Enter Project Name"
                  value={project.projectName}
                  setValue={(value) => editProjectName(value, project.id)}
                />

                <SelectComponent
                  title={"Project Month"}
                  errorMessage={
                    errors[`month${project.id}`]
                      ? errors[`month${project.id}`].message
                      : null
                  }
                  error={errors[`month${project.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => {
                      return (
                        <Select
                          value={props.field.value}
                          onChange={props.field.onChange}
                          error={
                            errors
                              ? errors[`month${project.id}`]
                                ? true
                                : false
                              : false
                          }
                        >
                          {months.map((month, index) => {
                            return (
                              <MenuItem key={index} value={month}>
                                {month}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                    name={`month${project.id}`}
                    control={control}
                    rules={{ required: "*Please select month" }}
                    defaultValue={project.projectMonth}
                  />
                </SelectComponent>

                <SelectComponent
                  title={"Project Year"}
                  errorMessage={
                    errors[`Year${project.id}`]
                      ? errors[`Year${project.id}`].message
                      : null
                  }
                  error={errors[`Year${project.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => {
                      return (
                        <Select
                          value={props.field.value}
                          onChange={props.field.onChange}
                          error={
                            errors
                              ? errors[`Year${project.id}`]
                                ? true
                                : false
                              : false
                          }
                        >
                          {years.map((year, index) => {
                            return (
                              <MenuItem key={index} value={year}>
                                {year}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                    name={`Year${project.id}`}
                    control={control}
                    rules={{ required: "*Please select year" }}
                    defaultValue={project.projectYear}
                  />
                </SelectComponent>
                <InputComponent
                  title="Project Link"
                  type={"text"}
                  name={`projectLink${project.id}`}
                  register={register}
                  required={true}
                  // error={errors[`projectLink${project.id}`]}
                  helperText="Enter Project Link"
                  value={project.projectLink}
                  setValue={(value) => editProjectLink(value, project.id)}
                />

                <InputComponent
                  title="Project Description"
                  type={"text"}
                  name={`projectDescription${project.id}`}
                  register={register}
                  multiline={true}
                  // error={errors[`projectDescription${project.id}`]}
                  helperText="Enter Project Description"
                  value={project.projectDescription}
                  setValue={(value) =>
                    editProjectDescription(value, project.id)
                  }
                />

              </div>
            </div>
          );
        })}
        {props.projects.length === 2 ? null : (
          <div className="add-new-btn-cont">
            <Button onClick={addNewProject} variant="text">
              Add New
            </Button>
          </div>
        )}
        <Divider sx={{ margin: "10px 0px" }} />
        <BackNextBtnComponent
          onNext={handleNext}
          onBack={handleBack}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
        />
      </form>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectComponent);
