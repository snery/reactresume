import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

interface JobsState {
    loading: boolean;
    jobs: JobData[];
    hasError: boolean;
}

export class Jobs extends React.Component<RouteComponentProps<{}>, JobsState>{
    constructor() {
        super();
        this.state = { jobs: [], loading: true, hasError: false };

        this.fetchJobData();
    }

    public render() {
        let content = this.state.loading
            ? <LoadingSpinner/>
            : this.state.hasError ? <ErrorMessage />
            :Jobs.renderJobsContent(this.state.jobs);

        return <div>
            {content}
        </div>;
    }

    private fetchJobData() {
        fetch('api/jobs').then(function (response) {
            if (response.ok) {
                return response;
            }
            throw new Error("Unable to fetch data");
        })
            .then(response => response.json() as Promise<JobData[]>)
            .then(data => {
                this.setState({ jobs: data, loading: false, hasError: false })
            })
            .catch(error => {
                this.setState({ loading: false, hasError: true })
            });
    }

    private static renderJobsContent(jobs: JobData[]) {
        return <div>
            <div className="col-xs-0 col-md-1"></div>
            <div className="col-xs-12 col-md-10">
                <h1 className="page-header">Job Experience</h1>
                <div className="row flex-row">
                    {jobs.map((job) =>
                        <div key={job.company} className="col-xs-12 col-md-6 card-col">
                            <div className="job-card">
                                <img className="logo" src={__webpack_public_path__ + "./images/" + job.image + ".png"} alt={ job.company + " logo"}></img>
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
                <div className="col-xs-0 col-md-1"></div>
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