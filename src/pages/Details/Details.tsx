import { Paper, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getBooksByTitles, moviesSearch } from '../../api/Api';

import { ImageProps, TMDBSearchResult } from '../../types/types';
import { StyledCircularProgress } from '../../templates/MoviesField/MoviesField.styles';

/*
The component below runs the details page of an object when clicking on books or movies. 
*/

export const Details = () => {
  const { pathname } = useLocation();
  let searchValue = pathname.split('/')[2];
  const detailType = pathname.split('/')[1];
  if (searchValue.includes('%20')) {
    searchValue = searchValue.replaceAll('%20', ' ');
  }
  const searchBookTitles = useQuery(['getBookTitles', searchValue], () =>
    getBooksByTitles(searchValue)
  );

  if (detailType === 'books' && searchBookTitles.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledCircularProgress />
      </div>
    );
  }
  return <></>;
  //     const bookDocsDataArray = searchBookTitles.data?.docs || []
  //     const id = last(pathname.split("/"))
  //     const bookKey = "/works/" + id
  //     const foundDoc = bookDocsDataArray.find(
  //         (movie) => bookKey === movie.key
  //     )

  //     return (
  //         <>
  //             <StyledDetailTitle variant="h5">
  //                 Details about the book '{foundDoc?.title}'
  //             </StyledDetailTitle>
  //             <StyledPaperDetails square>
  //                 <div style={{ padding: "10px" }}>
  //                     {foundDoc?.title && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Title"}</b>} - {foundDoc?.title}
  //                         </div>
  //                     )}
  //                     {foundDoc?.author_name && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Author(s)"}</b>} -{" "}
  //                             {foundDoc?.author_name.join(", ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.contributor && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Contributors"}</b>} -{" "}
  //                             {foundDoc?.contributor.join(" ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.first_publish_year && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"First Published"}</b>} -{" "}
  //                             {foundDoc?.first_publish_year}
  //                         </div>
  //                     )}
  //                     {foundDoc?.first_sentence && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"First Sentences"}</b>} -{" "}
  //                             {foundDoc?.first_sentence.join(" ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.ebook_access && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"E-Book Access"}</b>} -{" "}
  //                             {capitalize(foundDoc?.ebook_access)}
  //                         </div>
  //                     )}
  //                     {foundDoc?.ebook_count_i && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"E-Book Count"}</b>} -{" "}
  //                             {foundDoc?.ebook_count_i}
  //                         </div>
  //                     )}
  //                     {foundDoc?.edition_count && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Edition Count"}</b>} -{" "}
  //                             {foundDoc?.edition_count}
  //                         </div>
  //                     )}
  //                     {foundDoc?.language && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Language(s)"}</b>} -{" "}
  //                             {foundDoc?.language.join(", ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.subject && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Subject"}</b>} -{" "}
  //                             {foundDoc?.subject.join(", ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.id_amazon && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Amazon IDs"}</b>} -{" "}
  //                             {foundDoc?.id_amazon.join(", ")}
  //                         </div>
  //                     )}
  //                     {foundDoc?.key && (
  //                         <div style={{ margin: "2px" }}>
  //                             {<b>{"Key"}</b>} - {foundDoc?.key}
  //                         </div>
  //                     )}
  //                 </div>
  //             </StyledPaperDetails>
  //         </>
  //     )
  // }
};
