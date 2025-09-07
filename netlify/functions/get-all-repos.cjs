// ============================
// Additional Netlify Function for All Repos
// ============================

const { config } = require('./config.cjs');

exports.handler = async(event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    const githubToken = process.env.MY_GITHUB_TOKEN;
    
    if (!githubToken) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'MY_GITHUB_TOKEN not found' })
        };
    }

    const query = `
        query {
            user(login: "${config.github.username}") {
                repositories(first: ${config.api.limits.allRepos}, orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes {
                        name
                        description
                        updatedAt
                        repositoryTopics(first: ${config.api.limits.topicsPerRepo}) {
                            nodes {
                                topic {
                                    name
                                }
                            }
                        }
                        url
                        homepageUrl
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Netlify-Function'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(`GraphQL error: ${data.errors[0].message}`);
        }

        const repos = data.data.user.repositories.nodes;
        
        const transformedRepos = repos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            updated_at: repo.updatedAt,
            topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
            url: repo.url,
            homepage: repo.homepageUrl
        }));

        // console.log("All repo URLs:", transformedRepos.map(repo => repo.url))

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(transformedRepos)
        };

    } catch (error) {
        console.error('Request failed:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Failed to fetch repositories',
                details: error.message 
            })
        };
    }
}
