import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface EducationState {
    loading: boolean;
    schools: EducationData[];
    skills: SkillsData[];
}

export class Education extends React.Component<RouteComponentProps<{}>, EducationState>{
    constructor() {
        super();
        this.state = { schools: [], skills: [], loading: true };

        fetch('api/education').then(response => response.json() as Promise<EducationData[]>)
            .then(data => {
                this.setState({ schools: data, loading: false })
            });

        fetch('api/skills').then(response => response.json() as Promise<SkillsData[]>)
            .then(data => {
                this.setState({ skills: data })
            });
    }

    public render() {
        let content = this.state.loading
            ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            : Education.renderEducationContent(this.state.schools, this.state.skills);

        return <div>
            {content}
        </div>;
    }

    private static renderEducationContent(educs: EducationData[], skills: SkillsData[]) {
        return <div>
            <h1 className="page-header">Education</h1>
            <div className="row flex-row">
                {educs.map((educ) =>
                    <div key={educ.school} className="col-xs-12 col-md-6 card-col">
                        <div className="educ-card">
                            <img className="logo" src={__webpack_public_path__ + "./images/" + educ.image + ".png" }></img>
                            <h3>{educ.school}</h3>
                            <h5><b>{educ.startdate} - {educ.enddate}</b></h5>
                            <i>{educ.degree}</i>
                        </div>
                    </div>
                )}
            </div>
            <h1 className="page-header">Skills</h1>
            <div className="row flex-row">
                <div className="col-xs-12 col-md-6 card-col">
                    <div className="educ-card">
                        <ul>
                        {skills.map((skill) =>
                            <li key={skill.key}>
                                    <b key={skill.key}>{skill.key + ": "}</b>
                                    <span key={skill.value}>{skill.value}</span><br/>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
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