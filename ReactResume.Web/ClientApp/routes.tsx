import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Jobs } from './components/Jobs';
import { Code } from './components/Code';
import { Education } from './components/Education';

export const routes = <Layout>
    <Route exact path='/' component={ Jobs } />
    <Route path='/education' component={Education} />
    <Route path='/code' component={Code} />
</Layout>;
