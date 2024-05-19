import {
    Link,
    useParams
  } from "react-router-dom";

import {ROUT_PATH} from '../utils'

export function MainTask () {

    return (
        <>
            <h4>Main Task Page</h4>
            <Link to={ROUT_PATH['home']}>Go To the Main Page</Link>
        </>
    )
}

export const TaskDetail = () => {
    const params = useParams();
    return (
        <>
            <h4>This Page View Deteil Task</h4>
            <h5>id: {params.taskId}</h5>
            <Link to={ROUT_PATH['task']}>Go To the Task Page</Link>
        </>
    )
  };