// VK Music Widget Loader
class VKMusicLoader {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadVKAPI();
    }
    
    loadVKAPI() {
        if (window.VK) {
            this.createWidgets();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://vk.com/js/api/openapi.js?168';
        script.type = 'text/javascript';
        script.charset = 'windows-1251';
        script.onload = () => {
            this.createWidgets();
        };
        
        document.head.appendChild(script);
    }
    
    createWidgets() {
        // Korn плейлист
        VK.Widgets.Playlist('vk_playlist_korn', -2000670859, 13670859, 'ce8d90c6ba01ef963a', {
            width: '100%',
            height: '400'
        });
        
        // mzlff плейлист
        VK.Widgets.Playlist('vk_playlist_mzlff', -2000052820, 22052820, '7de3313f716a1e5f0e', {
            width: '100%',
            height: '400'
        });
        
        console.log('🎵 VK Music widgets loaded!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new VKMusicLoader();
});