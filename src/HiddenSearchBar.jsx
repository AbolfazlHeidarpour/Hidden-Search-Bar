import { useEffect, useMemo, useState } from 'react';
import { inputStyle, bsSearchStyle } from './styles';
import {BsSearch} from 'react-icons/bs';
import useSearch from './useSearch';

export default function HiddenSearchBar() {
  const {
    onSearchIconClick,
    onSearchInputBlur,
    showSearchIcon,
    onChange,
    inputEl,
    value,
  } = useSearch();

  const [uiProps, setUiProps] = useState({
    shadow: '',
    opacity: 0,
    borderBottomColor: '#fff'
  });

  const inputVisibilityStyle = useMemo(() => ({
    ...inputStyle,
    borderBottom: `1px solid ${uiProps.borderBottomColor}`,
    opacity: uiProps.opacity,
  }), [uiProps.opacity, uiProps.borderBottomColor]);
  
  let body = document.body.style;

  const showSearch = () => {
    setUiProps(prev => ({
      ...prev,
      opacity: 1,
    }));
    onSearchIconClick();
  };

  const onSearchFocus = () => {
    setUiProps(prev => ({
      ...prev,
      shadow: 'inset 0 -60vh 30vw 200px rgba(0, 0, 0, 0.8)',
      borderBottomColor: 'green'
    }));
  };

  const onSearchBlur = () => {
    setUiProps(prev => ({
      ...prev,
      shadow: 'none',
      opacity: 0,
      borderBottomColor: '#fff',
    }));
    onSearchInputBlur();
  };

  useEffect(() => {
    body.background = 'darkblue'; 
    body.boxShadow = uiProps.shadow;
    body.transition = 'all .3s ease';
  }, [uiProps, body]);

  return (
    <div className="container" style={{height: '100vh'}}>
      {showSearchIcon ? (
        <BsSearch style={bsSearchStyle} onClick={showSearch}/>
      ) : (
        <input
          style={inputVisibilityStyle}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          placeholder="Search"
          onChange={onChange}
          value={value}
          ref={inputEl}
          type='text'
        />
      )}
    </div>
  )
}