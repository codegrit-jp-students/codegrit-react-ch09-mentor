import React, { Component } from 'react';
import { fetchChatData } from '../../chatData';
import ConversationList from './ConversationList';

export default class extends Component {
  state = {
    chosenId: 1,
    page: 1,
    hasNextPage: true,
    conversations: [],
    loadingInitial: true,
    loadingMore: false
  }

  handleChooseConversation = (e, id) => {
    e.preventDefault();
    if (id !== this.state.chosenId) {
      this.setState({
        chosenId: id
      })
    }
  }
  
  async componentDidMount() {
    const chatData = await fetchChatData();
    this.setState({
      conversations: chatData.conversations,
      loadingInitial: false
    })
  }

  fetchMoreConversations = async (e = null) => {
    if (e) e.preventDefault();
    this.setState({
      loadingMore: true
    })
    console.log(this.state.page);
    const nextPage = this.state.page + 1;
    const chatData = await fetchChatData(nextPage);
    this.setState(state => {
      return {
        page: nextPage,
        hasNextPage: chatData.hasNextPage,
        conversations: state.conversations.concat(chatData.conversations),
        loadingMore: false,
      }
    });
  }

  render() {
    const {
      chosenId,
      hasNextPage,
      conversations,
      loadingInitial,
      loadingMore,
    } = this.state;
    const conversationListProps = {
      chosenId,
      hasNextPage,
      conversations,
      loadingInitial,
      loadingMore, 
      handleChooseConversation: this.handleChooseConversation,
      fetchMore: this.fetchMoreConversations
    }
    return (
      <ConversationList {...conversationListProps} />
    );
  }
}