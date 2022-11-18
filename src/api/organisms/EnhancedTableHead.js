import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material"
import styled from "@emotion/styled"

/*
The component below takes care of the Book Table Header, 
allowing for sorting of certain columns.
*/

export const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(property)
    }

    return (
        <TableHead>
            <TableRow>
                <StyledHeaderLeftCell
                    key="title"
                    sortDirection={orderBy === "title" ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === "title"}
                        direction={orderBy === "title" ? order : "asc"}
                        onClick={createSortHandler("title")}
                    >
                        {<b>Title (sorteable)</b>}
                        {orderBy === "title" ? (
                            <StyledSpan>
                                {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                            </StyledSpan>
                        ) : null}
                    </TableSortLabel>
                </StyledHeaderLeftCell>
                <StyledHeaderCell>
                    <b>Author</b>
                </StyledHeaderCell>
                <AdditionalHeaderCellNarrow>
                    <b>Contributors</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCellNarrow
                    key="first_publish_year"
                    sortDirection={
                        orderBy === "first_publish_year" ? order : false
                    }
                    onClick={createSortHandler("first_publish_year")}
                >
                    <TableSortLabel
                        active={orderBy === "first_publish_year"}
                        direction={
                            orderBy === "first_publish_year" ? order : "asc"
                        }
                        onClick={createSortHandler("first_publish_year")}
                    >
                        {<b>First Publish (sorteable)</b>}
                        {orderBy === "first_publish_year" ? (
                            <StyledSpan>
                                {order === "desc"
                                    ? "sorted descending"
                                    : "sorted ascending"}
                            </StyledSpan>
                        ) : null}
                    </TableSortLabel>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCellNarrow>
                    <b>Languages</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCellNarrow>
                    <b>E-book Access</b>
                </AdditionalHeaderCellNarrow>
                <AdditionalHeaderCell>
                    <b>Amazon IDs</b>
                </AdditionalHeaderCell>
                <AdditionalHeaderCell>
                    <b>Subjects</b>
                </AdditionalHeaderCell>
                <AdditionalHeaderCell>
                    <b>Time</b>
                </AdditionalHeaderCell>
            </TableRow>
        </TableHead>
    )
}

const StyledHeaderLeftCell = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-top-left-radius: 2px;
    border-right: 0.5px white solid;
`

const StyledHeaderCell = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-right: 0.5px white solid;
`

const AdditionalHeaderCellNarrow = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-right: 0.5px white solid;
    @media only screen and (max-width: 769px) {
        display: none;
    }
`

const AdditionalHeaderCell = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-right: 0.5px white solid;
    @media only screen and (max-width: 1520px) {
        display: none;
    }
`

const StyledSpan = styled.span`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1;
    margin: -1;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 20;
    width: 1;
`
