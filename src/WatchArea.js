import axios from "axios";
import React from "react";
import * as AppConstant from "./AppConstant"
import ErrorBoundary from "./ErrorBoundary";
import FormatNumber from "./FormatNumber";
import ColorContext from "./ColorContext";
import Modal from "./Modal"
import { navigate } from "@reach/router";


class WatchArea extends React.Component {

    constructor() {
        super();
        this.state = { loading: true };

    }


    componentDidMount() {

        axios.get(`${AppConstant.VIDEO_URL}&id=${this.props.id}`)
            .then((res) => {

                const item = res.data.items[0];
                this.setState({
                    title: item.snippet.title,
                    views: item.statistics.viewCount,
                    description: item.snippet.description,
                    channel: item.snippet.channelTitle,
                    like: item.statistics.likeCount,
                    url: item.id,
                    loading: false,



                });
            })
            .catch((err) => console.log(err));
    }

    toggleModal = () => { this.setState({ showModal: !this.state.showModal }) }

    goToYoutube = () => {
        //window.open(`https://www.youtube.com/watch?v=${this.state.url}`)
        navigate(`https://www.youtube.com/watch?v=${this.state.url}`)
    }

    render() {

        if (this.state.loading) {
            return <div className="loader"></div>
        }



        const { title, views, description, channel, like, url, showModal } = this.state;

        return (

            <div className="watch-area">
                <div className="player">

                    <iframe src={`//www.youtube.com/embed/${url}`} title={title}
                        width="1065"
                        height="450"
                        frameBorder="0"
                        allow="autoplat encrypted-media"
                    ></iframe>

                </div>

                <h1>{title}</h1>
                <div className="video-stats">
                    <div className=""> <FormatNumber number={views} /> Views</div>
                    <div className=""> <FormatNumber number={like} /> Likes</div>
                </div>
                <div className="channel-name">{channel} Channel</div>

                <ColorContext.Consumer>
                    {
                        ([themeColor]) => (
                            <button
                                onClick={this.toggleModal}
                                style={{ backgroundColor: themeColor }}>
                                Ver en youtube.
                            </button>

                        )
                    }
                </ColorContext.Consumer>

                <p>{description}</p>



                {showModal ? (
                    <Modal>
                        <div>
                            <h1>Quiere ver el video en youtube ?</h1>
                            <div className="buttons">
                                <button className="btn-green" onClick={this.goToYoutube}>Si</button>
                                <button onClick={this.toggleModal}>No</button>
                            </div>
                        </div>
                    </Modal>
                ) : null}

            </div>
        )
    }


}

export default function WatchAreaWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <WatchArea {...props} />
        </ErrorBoundary>
    )
}