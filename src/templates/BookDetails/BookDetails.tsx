import { Doc } from '../../types/types';
import { capitalize } from 'lodash';
import { StyledPaperDetails } from './BookDetails.styled';

export const BookDetails = ({ rowState }: { rowState: Doc }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <StyledPaperDetails square>
        <div style={{ padding: '10px' }}>
          {rowState.title && (
            <div style={{ margin: '2px' }}>
              {<b>{'Title'}</b>} - {rowState.title}
            </div>
          )}
          {rowState.author_name && (
            <div style={{ margin: '2px' }}>
              {<b>{'Author(s)'}</b>} - {rowState.author_name.join(', ')}
            </div>
          )}
          {rowState.contributor && (
            <div style={{ margin: '2px' }}>
              {<b>{'Contributors'}</b>} - {rowState.contributor.join(' ')}
            </div>
          )}
          {rowState.first_publish_year && (
            <div style={{ margin: '2px' }}>
              {<b>{'First Published'}</b>} - {rowState.first_publish_year}
            </div>
          )}
          {rowState.first_sentence && (
            <div style={{ margin: '2px' }}>
              {<b>{'First Sentences'}</b>} - {rowState.first_sentence.join(' ')}
            </div>
          )}
          {rowState.ebook_access && (
            <div style={{ margin: '2px' }}>
              {<b>{'E-Book Access'}</b>} - {capitalize(rowState.ebook_access)}
            </div>
          )}
          {rowState.ebook_count_i > 0 && (
            <div style={{ margin: '2px' }}>
              {<b>{'E-Book Count'}</b>} - {rowState.ebook_count_i}
            </div>
          )}
          {rowState.edition_count > 0 && (
            <div style={{ margin: '2px' }}>
              {<b>{'Edition Count'}</b>} - {rowState.edition_count}
            </div>
          )}
          {rowState.language && (
            <div style={{ margin: '2px' }}>
              {<b>{'Language(s)'}</b>} - {rowState.language.join(', ')}
            </div>
          )}
          {rowState.subject && (
            <div style={{ margin: '2px' }}>
              {<b>{'Subject'}</b>} - {rowState.subject.join(', ')}
            </div>
          )}
          {rowState.id_amazon && (
            <div style={{ margin: '2px' }}>
              {<b>{'Amazon IDs'}</b>} - {rowState.id_amazon.join(', ')}
            </div>
          )}
          {rowState.key && (
            <div style={{ margin: '2px' }}>
              {<b>{'Key'}</b>} - {rowState.key}
            </div>
          )}
        </div>
      </StyledPaperDetails>
    </div>
  );
};
