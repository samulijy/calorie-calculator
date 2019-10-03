import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'

const PageNumbers = ({ pageNumberOnClick, numberOfPages, selectedPage }) => {
    const rows = [];
    for (let i = 1; i <= numberOfPages; i++) {
        rows.push(
            <Button outline={i !== selectedPage} color="primary" key={i} onClick={() => pageNumberOnClick(i)}>{i}</Button>
        );
    }
    return (
        <ButtonGroup>
            <Button disabled={selectedPage === 1} onClick={() => pageNumberOnClick(selectedPage - 1)} outline color="primary">
                {'\u00ab'}
            </Button>
            {rows}
            <Button disabled={selectedPage === numberOfPages} onClick={() => pageNumberOnClick(selectedPage + 1)} outline color="primary">
                {'\u00bb'}
            </Button>
        </ButtonGroup>
    );
}

export default PageNumbers;