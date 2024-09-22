export const useOml2d = async () => {
  if (!import.meta.env.SSR) {
    const { loadOml2d } = await import('oh-my-live2d');
    loadOml2d({

      models: [
        {
          scale: 0.22,
          position: [0, 140],
          stageStyle: {
            height: 375,
            width: 280
          },
          path: 'https://leinaldo-1304990284.cos.ap-shanghai.myqcloud.com/live2d/model/xiaomai/xiaomai.json'
        }
      ]
    });
  }
}