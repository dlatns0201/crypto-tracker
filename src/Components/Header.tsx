import React from 'react';
import {useRecoilState} from "recoil";
import {isDarkAtom} from "../atoms";
import styled from "styled-components";
import {MAX_CONTAINER_WIDTH} from "../constants";
import {useNavigate} from "react-router-dom";
import Icon from "./Icon";
import Moon from "./Icons/Moon";
import Sun from "./Icons/Sun";

const Wrapper = styled.header`
  position: relative;
  
  &::before {
    display: block;
    height: 52px;
    content: '';
  }
`;

const FloatingArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 25%, rgba(0, 0, 0, 0.1) 75%);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${MAX_CONTAINER_WIDTH};
  margin: 0 auto;
  padding: 14px 20px;
`;

const GoBackBtn = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const GoBackIco = styled.i`
  display: block;
  position: relative;
  width: 32px;
  height: 24px;
  color: ${props => props.theme.textColor};
  
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -5px 0 0 -1px;
    border: 2px solid currentColor;
    border-width: 2px 0 0 2px;
    width: 8px;
    height: 8px;
    transform: rotate(-45deg) translate(-50%, -50%);
    content: '';
  }
  
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background: currentColor;
    transform: translate(-50%, -50%);
    content: '';
  }
`;

const ThemeToggleBtn = styled.button`
  border-radius: 50%;
  padding: 6px;
  border: 0;
  
  &.as_dark {
    background: #222;
  }
  
  &.as_light {
    background: #eee;
  }
  
  .ico_dark {
    width: 20px;
    height: 20px;
  }
  
  .ico_light {
    width: 20px;
    height: 20px;
  }
`;

function Header() {
  const navigate = useNavigate();
  const [isDarkTheme, setIsDarkTheme] = useRecoilState(isDarkAtom);
  const onToggleTheme = () => setIsDarkTheme(prev => !prev);
  const onGoBack = () => navigate(-1);

  return (
    <Wrapper>
      <FloatingArea>
        <Content>
          <GoBackBtn type='button' onClick={onGoBack}>
            <GoBackIco><span className='blind'>뒤로가기</span></GoBackIco>
          </GoBackBtn>
          <ThemeToggleBtn type='button' className={isDarkTheme ? 'as_dark' : 'as_light'} onClick={onToggleTheme}>
            {isDarkTheme ? <Icon className="ico_dark" SVGComponent={Moon} alterText='다크 모드' />
              : <Icon className="ico_light" SVGComponent={Sun} alterText='다크 모드' />}
          </ThemeToggleBtn>
        </Content>
      </FloatingArea>
    </Wrapper>
  );
}

export default Header;