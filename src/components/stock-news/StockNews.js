/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../common/PageTitle";
import NewsDropdown from "./NewsDropdown";

class StockNews extends React.Component {
  constructor(props) {
    super(props);

    this.updateSite = this.updateSite.bind(this);
    this.fetchNewsFeeds = this.fetchNewsFeeds.bind(this);

    this.state = {
      feeds :[],
      current_website :'news18.com'
    };
  }

  updateSite(site) {
    this.fetchNewsFeeds(site);
  }

  async componentDidMount() {
    this.fetchNewsFeeds(this.state.current_website);
  }

  async fetchNewsFeeds(site) {
    let apiUrl = 'http://localhost:8000/current/feeds/site/' + site + '/'
    const response = await fetch(apiUrl);
    const json = await response.json();
    let allFeeds = json['allFeeds'];
    
    let feedsInBatch = [];
    let batchSize = 4

		for (let i = 0; i < allFeeds.length; i = i + batchSize) {
			let feed = [];
			let innerLoopLimit

			if ((allFeeds.length - i) > batchSize) {
				innerLoopLimit = i + batchSize;
			} else {
				innerLoopLimit = allFeeds.length;
			}
			//inner loop
			for (let j = i; j < innerLoopLimit; j++) {
				feed.push(allFeeds[j]);
			}
			feedsInBatch.push(feed);
		}

    this.setState({ feeds: feedsInBatch });
    this.setState({ current_website: site });
  }


  render() {

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Market News" subtitle="Latest News" className="text-sm-left" />
        </Row>
        <NewsDropdown website={this.state.current_website} updateSite={this.updateSite}/>
        
        <Row></Row>
        <Row></Row>

        {this.state.feeds.map((feed, idx) => (
          <Row>
            {feed.map((eachFeed, idx) => (
              <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${eachFeed.image})` }}
                  >
                    <Badge
                    pill
                    className={`card-post__category bg-info`}
                  >
                    {eachFeed.site}
                  </Badge>
                  </div>
                  <CardBody>
                    <h5 className="card-title">
                      <a href={eachFeed.link} className="text-fiord-blue" target="_blank" rel="noopener noreferrer">
                        {eachFeed.title}
                      </a>
                    </h5>
                    { /*<p className="card-text d-inline-block mb-3">{eachFeed.summary}</p> */} 
                    
                    <span className="text-muted">{eachFeed.site}</span>
                    <span>                     </span><span></span>
                    <span className="text-muted">20th Setp 2021</span>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ))}

      
      </Container>
    );
  }
}

export default StockNews;
