import * as React from 'react';

export class LoadingSpinner extends React.Component<{}, {}>{
    public render() {
        return <div className="loadingWrapper">
            <div className="loader"></div>
        </div>;
    }
}