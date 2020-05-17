import * as React from 'react';
import lineGraph, {boxChart} from "../model/Functions";

export const App = (): JSX.Element => {

    return (
        <>
            <button onClick={(): void => lineGraph()}>LineGraph</button>
            <button onClick={(): void => boxChart()}>BarChart</button>
        </>
    );
}
