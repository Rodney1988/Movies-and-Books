import CircularProgress from "@mui/material/CircularProgress"
import styled from "@emotion/styled"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { getBooksByTitles } from "../api/Api"
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TablePagination,
    Typography,
} from "@mui/material"
import { capitalize, last } from "lodash"
import { useState } from "react"
import { TablePaginationActions } from "./TablePaginationActions"

/*
This component renders a table for the books based on the 'searchValue' prop passed by the parent.
*/

export const BooksField = ({ searchValue }: any) => {
    const navigate = useNavigate()
    // States used for the pagination
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const searchBookTitles = useQuery(["getBookTitles", searchValue], () =>
        getBooksByTitles(searchValue)
    )
    if (searchBookTitles.isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <StyledCircularProgress />
            </div>
        )
    }
    if (searchBookTitles.isError) {
        return (
            <span>
                <i>Error loading Books by title</i>
            </span>
        )
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const bookData = searchBookTitles.data
    const bookDocsArray = searchBookTitles.data?.docs || []
    const slicedDocs = bookDocsArray.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    )

    return (
        <StyledTableWrapper>
            <StyledCount>{bookData?.numFound} books found</StyledCount>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledHeaderLeftCell>
                                    <b>Title</b>
                                </StyledHeaderLeftCell>
                                <StyledHeaderCell>
                                    <b>Author</b>
                                </StyledHeaderCell>
                                <AdditionalHeaderCellNarrow>
                                    <b>Contributors</b>
                                </AdditionalHeaderCellNarrow>
                                <AdditionalHeaderCellNarrow>
                                    <b>First Publish</b>
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
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {/* Here is the where the sliced doc objects might get sliced */}
                            {(rowsPerPage > 0 ? slicedDocs : bookDocsArray).map(
                                (doc, key) => {
                                    return (
                                        <StyledBodyRow
                                            key={doc.title + key}
                                            onClick={() => {
                                                const docKey = last(
                                                    doc.key.split("/")
                                                )
                                                return navigate(
                                                    `/books/${searchValue}/${docKey}`
                                                )
                                            }}
                                        >
                                            <TableCell>{doc.title}</TableCell>
                                            <TableCell>
                                                {formatMultipleValues(
                                                    doc.author_name
                                                )}
                                            </TableCell>
                                            <AdditionalCellNarrow>
                                                {formatMultipleValues(
                                                    doc.contributor
                                                )}
                                            </AdditionalCellNarrow>
                                            <AdditionalCellNarrow>
                                                {doc.first_publish_year}
                                            </AdditionalCellNarrow>
                                            <AdditionalCellNarrow>
                                                {formatMultipleValues(
                                                    doc.language
                                                )}
                                            </AdditionalCellNarrow>
                                            <AdditionalCellNarrow>
                                                {capitalize(doc.ebook_access)}
                                            </AdditionalCellNarrow>
                                            <AdditionalCell>
                                                {formatMultipleValues(
                                                    doc.id_amazon
                                                )}
                                            </AdditionalCell>
                                            <AdditionalCell>
                                                {formatMultipleValues(
                                                    doc.subject
                                                )}
                                            </AdditionalCell>
                                            <AdditionalCell>
                                                {doc.time}
                                            </AdditionalCell>
                                        </StyledBodyRow>
                                    )
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                    ]}
                    component="div"
                    colSpan={1}
                    count={bookDocsArray ? bookDocsArray.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "rows per page",
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </StyledTableWrapper>
    )
}

const formatMultipleValues = (valueArray?: string[]) => {
    return valueArray?.map((string) => {
        return <div>{string}</div>
    })
}

export const StyledCircularProgress = styled(CircularProgress)`
    margin-top: 100px;
`
const StyledTableRow = styled(TableRow)`
    th:last-child {
        border-top-right-radius: 2px;
        border-right: none;
    }
`
const StyledTableWrapper = styled.div``
const StyledHeaderLeftCell = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-top-left-radius: 2px;
    border-right: 0.5px white solid;
`

const StyledHeaderCell = styled(TableCell)`
    background-color: rgb(165 153 153 / 60%);
    border-right: 0.5px white solid;
`
const StyledCount = styled(Typography)`
    color: #494947;
    margin: 5px 5px 10px 5px;
`

const StyledBodyRow = styled(TableRow)`
    :hover {
        cursor: pointer;
        background-color: rgb(242 236 236 / 78%);
    }
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

const AdditionalCell = styled(TableCell)`
    border-right: 0.5px white solid;
    @media only screen and (max-width: 1520px) {
        display: none;
    }
`

const AdditionalCellNarrow = styled(TableCell)`
    border-right: 0.5px white solid;
    @media only screen and (max-width: 769px) {
        display: none;
    }
`
