import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface JobsState {
    loading: boolean;
    jobs: JobData[];
}

export class Jobs extends React.Component<RouteComponentProps<{}>, JobsState>{
    constructor() {
        super();
        this.state = { jobs: [], loading: true };

        fetch('api/jobs').then(response => response.json() as Promise<JobData[]>)
            .then(data => {
                this.setState({ jobs: data, loading: false })
            });
    }

    public render() {
        let content = this.state.loading
            ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            : Jobs.renderJobsContent(this.state.jobs);

        return <div>
            { content }
        </div>;
    }

    private static renderJobsContent(jobs: JobData[]) {
        return <div>
            <h1 className="page-header">Job Experience</h1>
            <div className="row flex-row">            
            {jobs.map((job) =>                
                <div key={job.company} className="col-xs-12 col-md-6 card-col">
                    <div className="job-card">
                        <img className="logo" src={__webpack_public_path__ + "./images/" + job.image + ".png"}></img>
                        <h3>{job.company}</h3>
                        <h5><b>{job.position}</b>, {job.startdate} - {job.iscurrent === false ? job.enddate : "present"}</h5>
                        {job.responsibilities !== null && job.responsibilities.length !== 0 ? (
                            <div>
                                <label>Responsibilities include:</label>
                                <ul id={job.company + "respUl"}>
                                        {job.responsibilities.map((resp) =>
                                            <li key={resp}>{resp}</li>
                                    )}
                                </ul>
                            </div>) : null}
                        {job.projects !== null && job.projects.length !== 0 ? (
                            <div>
                                <label>Projects include:</label>
                                <ul id={job.company + "projUl"}>
                                        {job.projects.map((proj) =>
                                            <li key={proj}>{proj}</li>
                                    )}
                                </ul>
                            </div>) : null}
                    </div>
                </div>                
            )}
            </div>
        </div>;
    }
}

interface JobData {
    company: string;
    position: string;
    startdate: Date;
    enddate: Date;
    iscurrent: boolean;
    responsibilities: string[];
    projects: string[];
    image: string;
}