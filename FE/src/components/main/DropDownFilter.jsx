import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Radio, Space } from 'antd';
import styled from 'styled-components';

export default function DropDownFilter({ filterTitle, filterItems, dispatch, children }) {
    const [selectedKey, setSelectedKey] = useState(null);

    const dispatchTypeByFilter = {
        author: 'SET_SELECTED_AUTHOR_FILTER',
        label: 'SET_SELECTED_LABEL_FILTER',
        milestone: 'SET_SELECTED_MILESTONE_FILTER',
        assignee: 'SET_SELECTED_ASSIGNEE_FILTER',
    };
    const dispatchTypeByFilterContents = {
        'is:open': 'SET_SELECTED_IS_OPEN_FILTER',
        'is:closed': 'SET_SELECTED_IS_CLOSED_FILTER',
        'assignee:@me': 'SET_SELECTED_AUTHOR_ME_FILTER',
        'mentions:@me': 'SET_SELECTED_ASSIGNEE_ME_FILTER',
        'author:@me': 'SET_SELECTED_MENTIONS_ME_FILTER',
    };

    const handleMenuClick = ({ key }) => {
        setSelectedKey(key);
        message.info(`${key === 'null' ? `${children} 초기화` : key} 필터 선택`);

        if (children === '필터') {
            dispatch({ type: dispatchTypeByFilterContents[key], payload: key });
        } else {
            dispatch({ type: dispatchTypeByFilter[filterTitle], payload: key });
        }
    };

    const clearTypeItemTitle = {
        type1: '가 없는 이슈',
        type2: '이 없는 이슈',
    };

    const dropBoxTitle = () => {
        if (children === '필터') return '이슈 필터';
        return `${children} 필터`;
    };

    const titleItem = {
        label: (
            <ItemContainer>
                <div className="itemTitle">
                    <DropTitle>{dropBoxTitle()}</DropTitle>
                </div>
            </ItemContainer>
        ),
        key: '1',
        disabled: true,
    };

    const DropTitleComponent = ({ children, filterTitle }) => (
        <DropTitle>
            {children}
            {filterTitle === 'author' || filterTitle === 'assignee' ? clearTypeItemTitle['type1'] : clearTypeItemTitle['type2']}
        </DropTitle>
    );

    const clearTypeItem = {
        label: (
            <ItemContainer>
                <div className="itemTitle">
                    <DropTitleComponent children={children} filterTitle={filterTitle} />
                </div>
                <div className="ItemRadio">
                    <Radio checked={selectedKey === 'null'} onChange={() => setSelectedKey(null)}></Radio>
                </div>
            </ItemContainer>
        ),
        key: 'null',
    };

    const defaultTypeItems = () => {
        return filterItems
            ? filterItems.reduce((acc, cur) => {
                  acc.push({
                      label: (
                          <ItemContainer>
                              <div className="itemTitle">
                                  <DropTitle>{cur.title}</DropTitle>
                              </div>
                              <div className="ItemRadio">
                                  <Radio
                                      checked={selectedKey === (cur.value ?? cur.title)}
                                      onChange={() => setSelectedKey(cur.value ?? cur.title)}
                                  ></Radio>
                              </div>
                          </ItemContainer>
                      ),
                      key: cur.value ?? cur.title,
                  });
                  return acc;
              }, [])
            : [];
    };

    const imageTypeItems = () => {
        return filterItems
            ? filterItems.reduce((acc, cur) => {
                  acc.push({
                      label: (
                          <ItemContainer>
                              <div className="itemTitle">
                                  <DropTitle>
                                      <AvatarImage src={cur.avatarSrc}></AvatarImage>
                                      <UserName>{cur.userName}</UserName>
                                  </DropTitle>
                              </div>
                              <div className="ItemRadio">
                                  <Radio checked={selectedKey === cur.userName} onChange={() => setSelectedKey(cur.userName)}></Radio>
                              </div>
                          </ItemContainer>
                      ),
                      key: cur.userName,
                  });
                  return acc;
              }, [])
            : [];
    };

    const labelTypeItems = () => {
        return filterItems
            ? filterItems.reduce((acc, cur) => {
                  acc.push({
                      label: (
                          <ItemContainer>
                              <div className="itemTitle">
                                  <DropTitle>
                                      <StyledColor style={{ backgroundColor: cur.labelColor }}></StyledColor>
                                      <UserName>{cur.labelName}</UserName>
                                  </DropTitle>
                              </div>
                              <div className="ItemRadio">
                                  <Radio checked={selectedKey === cur.labelName} onChange={() => setSelectedKey(cur.labelName)}></Radio>
                              </div>
                          </ItemContainer>
                      ),
                      key: cur.labelName,
                  });
                  return acc;
              }, [])
            : [];
    };

    const itemByType = {
        issue: [titleItem, ...defaultTypeItems()],
        author: [titleItem, clearTypeItem, ...imageTypeItems()],
        label: [titleItem, clearTypeItem, ...labelTypeItems()],
        milestone: [titleItem, clearTypeItem, ...defaultTypeItems()],
        assignee: [titleItem, clearTypeItem, ...imageTypeItems()],
    };

    const items = itemByType[filterTitle];

    return (
        <StyledDropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    {children}
                    <DownOutlined />
                </Space>
            </a>
        </StyledDropdown>
    );
}

//TODO:
//3. 다크모드 테마에 따른 색상변경

const StyledColor = styled.div`
    border-radius: 50%;
    width: 20px;
    height: 20px;
`;
const AvatarImage = styled.img`
    border-radius: 50%;
    width: 20px;
`;

const StyledDropdown = styled(Dropdown)``;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;

    & .itemTitle {
        width: 180px;
    }
`;
const UserName = styled.span`
    margin: 10px;
`;
const DropTitle = styled.span`
    margin-left: 10px;
    margin-right: 10px;
    height: 20px;
    display: flex;
    align-items: center;
`;
