import * as React from 'react';

export class ErrorMessage extends React.Component<{}, {}>{
    public render() {
        return <div>
            <div className="row flex-row">
                <div className="col-xs-0 col-md-3"></div>
                <div className="col-xs-12 col-md-6">
                    <div className="errorContainer">
                        <p><i className="glyphicon glyphicon-alert" alt="Error image">&nbsp;</i>Sorry, an error occurred attempting to load the data. I apologize for the inconvenience.</p>
                    </div>
                </div>
                <div className="col-xs-0 col-md-3"></div>
            </div>
        </div>;
    }
};