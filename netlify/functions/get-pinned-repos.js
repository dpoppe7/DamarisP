// =====================================
// Simple fetch approach without Octokit
// =====================================
const { config, getConfig } = require('./config.js');

async function getStandardRepoImage(repoName, defaultBranch = config.github.defaultBranch) {
  const githubToken = process.env.MY_GITHUB_TOKEN;
  
  for (const path of config.github.imagePaths) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/dpoppe7/${repoName}/contents/${path}?ref=${defaultBranch}`,
        {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (response.ok) {
        // console.log(`Found image for ${repoName}: ${path}`)
        return `https://raw.githubusercontent.com/dpoppe7/${repoName}/${defaultBranch}/${path}`;
      }
      else {
        console.log(`Not found - Image for ${repoName}, path: ${path}, (${response.status})`); // Debug log
      }
    } catch (error) {
        console.log(`Error checking ${path}:`, error.message);
    }
  }
  return null;
}

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
            user(login: "${config.github.username}") {
                pinnedItems(first: ${config.api.limits.pinnedRepos}, types: REPOSITORY) {
                    nodes {
                        ... on Repository {
                            name
                            description
                            updatedAt
                            openGraphImageUrl
                            defaultBranchRef {
                                name
                            }
                            repositoryTopics(first: ${config.api.limits.topicsPerRepo}) {
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
        
        const transformedRepos = await Promise.all(
            pinnedRepos.map(async (repo) => {
                const customImage = await getStandardRepoImage(
                    repo.name, 
                    repo.defaultBranchRef?.name || config.github.defaultBranch
                );

                const result = {
                    name: repo.name,
                    description: repo.description || 'No description available',
                    updated_at: repo.updatedAt,
                    topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
                    url: repo.url,
                    image: customImage || repo.openGraphImageUrl || null
                };

                // console.log(`Final result for ${repo.name}:`, {
                //     name: result.name,
                //     hasImage: !!result.image,
                //     imageUrl: result.image ? result.image.substring(0, 50) + '...' : 'none'
                // });

                return result;
            })
        );

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