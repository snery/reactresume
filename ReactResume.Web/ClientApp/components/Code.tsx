import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Code extends React.Component<RouteComponentProps<{}>, {}>{
    constructor() {
        super();
    }

    public render() {
        return <div>
                <div className="col-xs-0 col-md-3"></div>
                <div className="col-xs-12 col-md-6 no-padding">
                    <h1 className="page-header">Code</h1>
                    <div className="code-card">
                        <p>This resume web application was developed in Visual Studio Core, using C#, WebAPI, TypeScript, React JS, jQuery,
                            Bootstrap and custom CSS3. The application is hosted in Azure.</p>
                        <p>It is split up into three projects -- Data, Caching and Web. The Data layer makes use of generics to load
                            data from JSON files. It references the Caching project, which provides a generic interface to pass in functions
                            as an anonymous delegate, calculate the cache key and create/retrieve the value from memory. The Web project
                            uses TypeScript and React to render the HTML, complete with the data retrieved through API calls.</p>
                    <p>The code is posted on GitHub: <a title="Link to GitHub" target="_blank" href="https://github.com/snery/reactresume">React Resume</a></p>
                    <img src={__webpack_public_path__ + "./images/github.png"} alt="GitHub logo"></img>
                    </div>
                    </div>
                    <div className="col-xs-0 col-md-3"></div>
            </div>;
    }
}