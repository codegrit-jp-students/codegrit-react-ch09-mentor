import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import moment from 'moment-timezone';
import 'moment/locale/ja'
import AvatarOne from '../../../images/avatar1.png';

const SEVEN_DAYS_AGO = moment().subtract(7, 'day').format('x');
const START_OF_YEAR = moment().startOf('year').format('x');

const ListItemWrapper = styled.li({
  "display": "flex",
  "flexDirection": "row",
  "overflowX": "hidden",
  "padding": "10px",
  "borderBottom": "1px solid #ddd",
  "minHeight": "75px"
}, ({ active }) => {
  const styles = [];
  if (active) {
    styles.push({
      backgroundColor: '#F4F4F4'
    })
  }
  return styles;
})

const AvatarWrapper = styled.div({
  marginRight: 15,
})

const AvatarImage = styled.img({
  "borderRadius": "50%",
  "height": "50px",
  "width": "50px",
  "backgroundColor": "#F4F4F4"
})

const ChatUserWrapper = styled.div({
  "display": "flex",
  "flex": "1 1 auto",
  "justifyContent": "center",
  "minWidth": "0",
  "padding": "0 12px 0 0",
  "flexDirection": "column"
})

const ChatUserUpper = styled.div({
  "display": "flex",
  "flexDirection": "row",
  "justifyContent": "space-between"
})

const LastChatTime = styled.div({
  "color": "#9E9F9F",
  "fontSize": "0.9em",
})

const LastMessage = styled.div({
  "fontSize": "0.9em",
  "color": "#9E9F9F",
  "overflow": "hidden",
  "textOverflow": "ellipsis",
  "whiteSpace": "nowrap"
})

const getFormattedDate = (unixTime) => {
  moment.locale('ja');
  const parsedTime = parseInt(unixTime)
  if (parsedTime >= SEVEN_DAYS_AGO) {
    return moment(parsedTime).fromNow();
  }
  if (parsedTime >= START_OF_YEAR) {
    return moment(parsedTime).format('M月D日');
  }
  return moment(parsedTime).format('YYYY年M月D日');
} 

const ConversationListItem = ({ 
  handleChooseConversation,
  conversation, 
  isChosen 
}) => {
  const formattedTime = getFormattedDate(conversation.lastMessage.sentAt);
  return (
    <ListItemWrapper active={isChosen} onClick={(e) => handleChooseConversation(e, conversation.id)} >
      <AvatarWrapper>
        <AvatarImage
          alt='アバター'
          src={conversation.user.avatarUrl} />
      </AvatarWrapper>
      <ChatUserWrapper>
        <ChatUserUpper>
          <div className="chat-user-name">
            {conversation.user.name}
          </div>
          <LastChatTime>
            {formattedTime}
          </LastChatTime>
        </ChatUserUpper>
        <LastMessage>
          {conversation.lastMessage.body}
        </LastMessage>
      </ChatUserWrapper>
    </ListItemWrapper>
  );
}

ConversationListItem.propTypes = {
  conversation: PropTypes.object.isRequired
}

ConversationListItem.defaultProps = {
  conversation: {
    avatarUrl: AvatarOne,
    name: "会話相手",
    lastMessage: {
      sentAt: 1557905239000,
      body: "こんにちは!"
    }
  }
}

export default ConversationListItem;

