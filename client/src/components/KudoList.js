import React from 'react';

const Kudo = props => (
    <div className='kudo' key={props._id}>
        <h3>{props.title}</h3>
        <h4>From: {props.from.name}</h4>
        <h4>To: {props.to.name}</h4>
        <p>{props.body}</p>
    </div>
)

const KudoList = props => (
    <div className="kudo-list">
        <h2>Kudos Given:</h2>
        {props.kudos.map(props => Kudo(props))}
    </div>
)

export default KudoList;