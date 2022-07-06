import React, {ChangeEventHandler, useState} from "react";

export default function (props: {
    list: { key: string|number, value: string }[],
    placeholder?: string,
    value?: string|number,
    icon?: string,
    onChange?: (item: {key: string|number, value: string}) => void
}) {

    const [selectedItem, setSelectedItem] = useState<{key: string|number, value: string}|null>(null);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [mouseOnSelect, setMouseOnSelect] = useState<boolean>(false);

    const changeSelected = (item: {key: string|number, value: string}) => {
        setSelectedItem(item);
        if(props.onChange){
            props.onChange(item);
        }
        setSelecting(false);
        setMouseOnSelect(false);
    }


    return (
        <div className="my-select-container d-flex shadow-sm">

            <div className="select-icon-container">
                <i className={props.icon ?? "bi bi-person-badge"} />
            </div>
            <div className="my-select-input d-flex">
                <button
                    className="selected-item-text"
                    onClick={() => {setSelecting(true);}}
                    onBlur={() => {
                        if(!mouseOnSelect){
                            setSelecting(false);
                        }
                    }}
                    type="button"
                >
                    {selectedItem ? selectedItem.value : props.placeholder}
                </button>
                <div
                    onMouseOut={() => {setMouseOnSelect(false);}}
                    onMouseOver={() => {setMouseOnSelect(true);}}
                    className="my-select-list-container rounded shadow"
                    style={{display: selecting ? "" : "none"}}
                >
                    {props.list.map(single_item => {
                        return (
                            <li
                                className="my-select-list-item"
                                onClick={(event: any) => {
                                    changeSelected(single_item);
                                }}
                                key={single_item.key}
                            >
                                {single_item.value}
                            </li>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}