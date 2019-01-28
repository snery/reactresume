import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

interface EducationState {
    educationLoading: boolean;
    skillsLoading: boolean;
    schools: EducationData[];
    skills: SkillsData[];
    hasEducationError: boolean;
    hasSkillsError: boolean;
}

export class Education extends React.Component<RouteComponentProps<{}>, EducationState>{
    constructor() {
        super();
        this.state = { schools: [], skills: [], skillsLoading: true, educationLoading: true, hasEducationError: false, hasSkillsError: false };

        this.fetchEducationData();
        this.fetchSkillData();
    }

    public render() {
        let educationContent = this.state.educationLoading
            ? <LoadingSpinner />
            : Education.renderEducationContent(this.state.schools);

        let skillsContent = this.state.skillsLoading
            ? <LoadingSpinner />
            : Education.renderSkillContent(this.state.skills);

        return <div>
            {educationContent}
            {skillsContent}
        </div>;
    }

    private fetchEducationData() {
        fetch('api/education').then(function (response) {
            if (response.ok) {
                return response;
            }
            throw new Error("Unable to fetch data");
        })
            .then(response => response.json() as Promise<EducationData[]>)
            .then(data => {
                this.setState({ schools: data, educationLoading: false, hasEducationError: false })
            })
            .catch(error => {
                this.setState({ educationLoading: false, hasEducationError: true })
            });
    }

    private fetchSkillData() {
        fetch('api/skills').then(function (response) {
            if (response.ok) {
                return response;
            }
            throw new Error("Unable to fetch data");
        })
            .then(response => response.json() as Promise<SkillsData[]>)
            .then(data => {
                this.setState({ skills: data, skillsLoading: false, hasSkillsError: false })
            })
            .catch(error => {
                this.setState({ skillsLoading: false, hasSkillsError: true })
            });
    }

    private static renderEducationContent(educs: EducationData[]) {
        return <div>
            <div className="col-xs-0 col-md-1"></div>
            <div className="col-xs-12 col-md-10">
                <h1 className="page-header">Education</h1>
                <div className="row flex-row">
                    {educs.map((educ) =>
                        <div key={educ.school} className="col-xs-12 col-md-6 card-col">
                            <div className="educ-card">
                                <img className="logo" src={__webpack_public_path__ + "./images/" + educ.image + ".png"} alt={educ.school + " logo"}></img>
                                <h3>{educ.school}</h3>
                                <h5><b>{educ.startdate} - {educ.enddate}</b></h5>
                                <i>{educ.degree}</i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-xs-0 col-md-1"></div>
        </div>;
    }

    private static renderSkillContent(skills: SkillsData[]) {
        return <div>
            <div className="col-xs-0 col-md-3"></div>
            <div className="col-xs-12 col-md-6">
                <h1 className="page-header">Skills</h1>
                <div className="row flex-row">
                    <div className="educ-card">
                        <ul>
                            {skills.map((skill) =>
                                <li key={skill.key}>
                                    <b key={skill.key}>{skill.key + ": "}</b>
                                    <span key={skill.value}>{skill.value}</span><br />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xs-0 col-md-3"></div>
        </div>;
    }
}

interface EducationData {
    image: string;
    school: string;
    startdate: Date;
    enddate: Date;
    degree: string;
}

interface SkillsData {
    key: string;
    value: string;
}