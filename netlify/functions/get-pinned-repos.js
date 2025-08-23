// =====================================
// Simple fetch approach without Octokit
// =====================================

export async function handler(event, context) {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Get GitHub token
    const githubToken = process.env.MY_GITHUB_TOKEN;
    
    if (!githubToken) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'MY_GITHUB_TOKEN not found' })
        };
    }

    // GraphQL query
    const query = `
        query {
            user(login: "dpoppe7") {
                pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            name
                            description
                            updatedAt
                            repositoryTopics(first: 5) {
                                nodes {
                                    topic {
                                        name
                                    }
                                }
                            }
                            url
                        }
                    }
                }
            }
        }
    `;

    try {
        // Use native fetch to call GitHub GraphQL API
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
            console.error('GraphQL errors:', data.errors);
            throw new Error(`GraphQL error: ${data.errors[0].message}`);
        }

        // Extract and transform the data
        const pinnedRepos = data.data.user.pinnedItems.nodes;
        
        const transformedRepos = pinnedRepos.map(repo => ({
            name: repo.name,
            description: repo.description || 'No description available',
            updated_at: repo.updatedAt,
            topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
            url: repo.url
        }));

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
                error: 'Failed to fetch pinned repositories',
                details: error.message 
            })
        };
    }
}