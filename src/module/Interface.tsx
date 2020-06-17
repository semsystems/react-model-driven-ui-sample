import React, { Component } from 'react';
import { TModel } from '../App';

interface UIComponent {
    element: string,
    content?: UIComponent[] | null | string
    properties?: object
  }

function iterate(comp: UIComponent[]) {
    return comp.map((e: UIComponent) => {
        return React.createElement(e.element, e.properties, e.content);
    })
}
  

interface TInterface {
    model: TModel,
    lib: any
}

export function Interface({model, lib}: TInterface) {
    if (typeof model !== "object") {
        return null
    }
    // @ts-ignore
    const iterate = (model: UIComponent[]) => {
        return model.map(e => {
            const {element, properties, content} = e;
    
            return React.createElement(lib[(element)], {
                ...properties,
            }, typeof content === 'object' 
                // @ts-ignore
                ? iterate(content)
                : content)
        });
    }
    
    const Tree = iterate(model);

    return <div>{Tree}</div>
}