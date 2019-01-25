import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'> 
            <div className="row">                
                <div className="col-xs-12">
                    <NavMenu />
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}
