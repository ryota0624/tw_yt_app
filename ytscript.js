	var scriptTag = document.createElement('script');
	scriptTag.src = "https://www.youtube.com/player_api";
	var fsTag = document.getElementsByTagName('script')[0];
	fsTag.parentNode.insertBefore(scriptTag, fsTag);
	function onYouTubePlayerAPIReady() {
    window.YTPlayer = new YT.Player('youtube', {
        height: '100',
        width: '175',
        videoId: ''
    });
	};