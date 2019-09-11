// @flow

import React from 'react';
var linkEl;

function drawIcon(src, num, cb) {
  var img = document.createElement('img');
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, img.width, img.height);
    context.drawImage(img, 0, 0);

    var top = img.height - 9,
      left = img.width - 7 - 1,
      bottom = 16,
      right = 16,
      radius = 2;

    context.fillStyle = '#F03D25';
    context.strokeStyle = '#F03D25';
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(left + radius, top);
    context.quadraticCurveTo(left, top, left, top + radius);
    context.lineTo(left, bottom - radius);
    context.quadraticCurveTo(left, bottom, left + radius, bottom);
    context.lineTo(right - radius, bottom);
    context.quadraticCurveTo(right, bottom, right, bottom - radius);
    context.lineTo(right, top + radius);
    context.quadraticCurveTo(right, top, right - radius, top);
    context.closePath();
    context.fill();

    context.font = 'bold 10px arial';
    context.fillStyle = '#FFF';
    context.textAlign = 'right';
    context.textBaseline = 'top';
    context.fillText(String(num), 15, 6);

    cb(null, context.canvas.toDataURL());
  };
  img.src = src;
}

type Props = {
  url: string,
  animated?: ?boolean,
  alertCount?: ?number,
  keepIconLink?: ?(any) => boolean,
  animationDelay?: ?number,
};

type State = {
  animationIndex: number,
  animationLoop: ?IntervalID,
  animationRunning: boolean,
};

class Favicon extends React.Component<Props, State> {
  static displayName = 'Favicon';

  static defaultProps = {
    alertCount: null,
    animated: true,
    animationDelay: 500,
    keepIconLink: function() {
      return false;
    },
  };

  static mountedInstances = [];

  static getActiveInstance() {
    return Favicon.mountedInstances[Favicon.mountedInstances.length - 1];
  }

  static draw() {
    if (typeof document === 'undefined') return;

    var activeInstance = Favicon.getActiveInstance();
    if (typeof linkEl === 'undefined') {
      var head = document.getElementsByTagName('head')[0];
      linkEl = document.createElement('link');
      linkEl.type = 'image/x-icon';
      linkEl.rel = 'icon';

      // remove existing favicons
      var links = head.getElementsByTagName('link');
      for (var i = links.length; --i >= 0; ) {
        if (
          /\bicon\b/i.test(links[i].getAttribute('rel') || '') &&
          !(
            activeInstance.props.keepIconLink &&
            activeInstance.props.keepIconLink(links[i])
          )
        ) {
          head.removeChild(links[i]);
        }
      }

      head.appendChild(linkEl);
    }

    var currentUrl;

    if (activeInstance.props.url instanceof Array) {
      currentUrl =
        activeInstance.props.url[activeInstance.state.animationIndex];
    } else {
      currentUrl = activeInstance.props.url;
    }

    if (activeInstance.props.alertCount) {
      drawIcon(currentUrl, activeInstance.props.alertCount, function(err, url) {
        linkEl.href = url;
      });
    } else {
      linkEl.href = currentUrl;
    }
  }

  static update() {
    if (typeof document === 'undefined') return;

    var activeInstance = Favicon.getActiveInstance();
    var isAnimated =
      activeInstance.props.url instanceof Array &&
      activeInstance.props.animated;

    // clear any running animations
    var intervalId = null;
    clearInterval(activeInstance.state.animationLoop);

    if (isAnimated) {
      var animateFavicon = function animateFavicon() {
        var nextAnimationIndex =
          (activeInstance.state.animationIndex + 1) %
          activeInstance.props.url.length;
        Favicon.draw();
        activeInstance.setState({animationIndex: nextAnimationIndex});
      };
      intervalId = setInterval(
        animateFavicon,
        activeInstance.props.animationDelay || 0,
      );
      animateFavicon();
    } else {
      Favicon.draw();
    }

    activeInstance.setState({animationLoop: intervalId});
  }

  state = {
    animationIndex: 0,
    animationLoop: null,
    animationRunning: false,
  };

  componentDidMount() {
    console.log('favicon!');
    Favicon.mountedInstances.push(this);
    Favicon.update();
  }

  componentWillUnmount() {
    var activeInstance = Favicon.getActiveInstance();
    clearInterval(activeInstance.state.animationLoop);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.url === this.props.url &&
      prevProps.animated === this.props.animated &&
      prevProps.alertCount === this.props.alertCount &&
      prevProps.keepIconLink === this.props.keepIconLink
    )
      return;

    Favicon.update();
  }

  render() {
    return null;
  }
}

export default Favicon;
