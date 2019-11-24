import React from "react";
import Checkbox from "../Elements/Checkbox";
import {ListGroup, ListGroupItem} from 'reactstrap';

const Genres = ({genres, isChecked, handleChange}) => {
        return (
            <div className="form-group">
                <p>Жанры:</p>
                <ListGroup>
                    {genres.map(item => (
                        <ListGroupItem key={item.id}>
                            <Checkbox
                                title={item.name}
                                name={"genre"}
                                value={item.id}
                                checked={isChecked(item.id)}
                                onChange={handleChange}
                            />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
};

export default Genres
