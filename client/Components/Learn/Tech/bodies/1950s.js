/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';
import { WebView } from 'react-native-webview';
import data from '../data/techData';
import Timeline from 'react-native-timeline-flatlist';
import AwesomeButton from 'react-native-really-awesome-button';
import { FontContext } from '../../../Root/Context';

export default class TechTimeLine extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.data = data.filter(data => data.timeId <= 2);
    this.state = {selected: null};
  }

  onEventPress(data) {
    if (data) {
      this.setState({selected: data});
    }
  }

  renderSelected() {
    if (this.state.selected) {
      return (
        <WebView mediaPlaybackRequiresUserAction={true}
          javaScriptEnabled={true}
          height={20}
          source={{uri: this.state.selected.uri }} />

      );
    }
  }


  renderDetail( data ) {
    const { imageUrl, description, title } = data;
    const title2 = (
      <FontContext.Consumer>
        {({ Font }) => (
          <Text style={{...Font, ...styles.title}}>{title}</Text>
        )}
      </FontContext.Consumer>
    );

    let desc = null;
    if (data) {
      desc = (
        <FontContext.Consumer>
          {({ Font }) => (
            <View style={styles.descriptionContainer}>
              <Image source={{uri: imageUrl}} style={styles.image}/>
              <Text style={{...Font, ...styles.textDescription}}>{ description}</Text>
            </View>
          )}
        </FontContext.Consumer>
      );
    }

    return (
      <View style={{flex: 1}}>
        {title2}
        {desc}
        <View >
          <View style={styles.button}>
            <AwesomeButton height={20} width={90}
              onPress={() => { this.setState({selected: data}); }}
            >
              Video 🚀
            </AwesomeButton>
          </View>
        </View>
      </View>
    );
  }


  render() {
    const image = { uri: 'https://i.pinimg.com/originals/0b/06/39/0b06397a3199bee4a5922ee4488ebf5a.jpg' };
    return (
      <FontContext.Consumer>
        {({ Font }) => (
          <ImageBackground style= { styles.backgroundImage } source={image} imageStyle=
            {{opacity: 0.7}}>
            <View style={styles.container}>
              <Text style={{...Font, ...styles.header}} >1950s</Text>
              {this.state.selected && <AwesomeButton height={20} width={70}
                onPress={() => { this.setState({selected: false}); }}
              >
              X
              </AwesomeButton >}
              {this.renderSelected()}
              <Timeline
                style={styles.list}
                data={this.data}
                circleSize={20}
                circleColor='rgba(0,0,0,0)'
                lineColor='rgb(45,156,219)'
                timeContainerStyle={{minWidth: 52, marginTop: -5}}
                timeStyle={{textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13}}
                descriptionStyle={{color: 'gray'}}
                options={{
                  style: {paddingTop: 5}
                }}
                innerCircle={'icon'}
                renderDetail={this.renderDetail}
              />
            </View>
          </ImageBackground>
        )}
      </FontContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  containerVideo: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  list: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    color: '#9ee7ff',
    fontSize: 30,
    fontWeight: 'bold'
  },
});
