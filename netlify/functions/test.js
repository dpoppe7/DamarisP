// exports.handler = async (event, context) => {
//     return {
//         statusCode: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ 
//             message: 'Test function works!',
//             timestamp: new Date().toISOString(),
//             hasMyGithubToken: !!process.env.MY_GITHUB_TOKEN,
//             hasGithubToken: !!process.env.GITHUB_TOKEN,
//             tokenPreview: process.env.MY_GITHUB_TOKEN ? `${process.env.MY_GITHUB_TOKEN.substring(0, 8)}...` : 'not found',
//             allEnvKeys: Object.keys(process.env).filter(key => key.includes('GITHUB') || key.includes('TOKEN')),
//             netlifyContext: process.env.CONTEXT || 'unknown',
//             nodeEnv: process.env.NODE_ENV || 'unknown'
//         })
//     };
// };