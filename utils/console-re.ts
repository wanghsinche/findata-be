import consolere from 'console-remote-client'             
consolere.connect({
    server: 'https://console.re', // optional, default: https://console.re
    channel: '7733-bcf5-321', // required
    redirectDefaultConsoleToRemote: true, // optional, default: false
    disableDefaultConsoleOutput: true, // optional, default: false
  });
