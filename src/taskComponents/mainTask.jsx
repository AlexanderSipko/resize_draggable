import React, { useState, useEffect, useRef } from 'react';

import {
    Link,
    useParams
  } from "react-router-dom";

import { ROUT_PATH, MOK_TASK } from '../utils'

export function MainTask () {

    return (
        <>
            <h4>Main Task Page</h4>
            <Link to={ROUT_PATH['home']}>Go To the Main Page</Link>

            <RenderTask/>
        </>
    )
}

const RenderTask = () => {

    const [ taskArray, setTaskArray ] = useState(MOK_TASK)
    const [ currentCard, setCurrentCard ] = useState(null)
    const sortCard = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    return (
        <>
            {taskArray.sort(sortCard).map((task, index) => {
                return <TaskCard 
                            key={index + '-' + task.id}
                            task={task}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                            taskArray={taskArray}
                            setTaskArray={setTaskArray}
                        />
            })}
        </>
    )
}

const TaskCard = ({task, currentCard, setCurrentCard, taskArray, setTaskArray}) => {
    

    const style = {
        'border':'0.5px solid gray',
        'borderRadius':'5px',
        'padding':'4px',
        'width':'40vw',
        'margin':'2px 0px 2px 0px'
    }

    const dragStartHandler = (e, task) => {
        setCurrentCard(task)
        console.log('dragStart', task)
    }

    const dragLeaveHandler = (e) => {
        e.target.style.background = 'none'
        // e.target.style.marginTop = '2px'
    }

    const dragEndHandler = (e) => {
        // e.preventDefault();
        // console.log(e.pageX, e.pageY, e.currentTarget.offsetWidth, e.currentTarget.offsetHeight)
        e.target.style.background = 'none'
    }

    const dragOverHandler = (e, task) => {
        e.preventDefault();
        e.target.style.background = 'lightgray' // у текущего event меняем цвет фона
        // currentCard
        // console.log(e.id, task.id)
        // e.target.style.marginTop = '15px'
    }

    const dropHandler = (e, task) => {
        e.preventDefault();
        
        setTaskArray(taskArray.map((c) => {
            console.log('dragDrop', c.id,  task.id)
            if (c.id === task.id) {
                return {...c, order:currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order:task.order}
            }
            return c
        }))
    }



    return (
        <div 
            style={style}
            draggable
            onDragStart={(e) => dragStartHandler(e, task)} // в момент когда взяли карточку
            onDragLeave={(e) => dragLeaveHandler(e)} // вышли за пределы другой карточки
            onDragEnd={(e) => dragEndHandler(e)} // отпустили перемещение
            onDragOver={(e) => dragOverHandler(e)} // находимся над другим объектом
            onDrop={(e) => dropHandler(e, task)} // отпустили карточку и связанное действие
        >
            {task.name}
        </div>
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