import { useEffect, useRef, useState } from 'react';

export default function useSearch() {
  const [value, setValue] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const inputEl = useRef(null);

  const onChange = e => setValue(e.target.value);

  const onSearchIconClick = () => {
    setShowSearchBar(true);
    setShowSearchIcon(false);
  };

  const onSearchInputBlur = () => {
    setShowSearchBar(false);
    setShowSearchIcon(true);
  };

  useEffect(() => {
    showSearchBar && inputEl.current.focus();
  }, [showSearchBar]);

  return {
    onSearchIconClick,
    onSearchInputBlur,
    showSearchIcon,
    onChange,
    inputEl,
    value
  };
}