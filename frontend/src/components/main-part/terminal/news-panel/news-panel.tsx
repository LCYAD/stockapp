import * as React from 'react';
import './news-panel.css';

interface NewsPanelProps { 
    panel: string;
}

interface NewsPanelState { }

class NewsPanel extends React.Component<NewsPanelProps, NewsPanelState> {

  constructor(props: NewsPanelProps) {
    super(props);
  }

  render() {
    return (
      <div>
        This is the News panel
      </div>
    );
  }
} // End NewsPanel Class

export default NewsPanel;