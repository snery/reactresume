import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Jobs } from './components/Jobs';
import { Education } from './components/Education';

export const routes = <Layout>
    <Route exact path='/' component={ Jobs } />
    <Route path='/education' component={ Education } />
</Layout>;
