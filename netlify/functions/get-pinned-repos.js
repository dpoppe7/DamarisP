// =====================================
// This file contains code to make GraphQL API call
// =====================================

// Import the Octokit library to make the GraphQL request
// 'npm install @octokit/core' to add this to project's dependencies.
import { Octokit } from "@octokit/core";

export async function handler(event, context) {
    // Add CORS headers for local development
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
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

    // Secure environment variable
    const githubToken = process.env.MY_GITHUB_TOKEN;

    // Verify token exists/available
    if (!githubToken) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'MY_GITHUB_TOKEN not found' })
        };
    }

    // This is GraphQL query definition
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

    // Secure GraphQL request to GitHub
    try {
        const octokit = new Octokit({ auth: githubToken });
        const response = await octokit.graphql(query);

        // Pinned repos are nested in the response, extracting them
        const pinnedRepos = response.user.pinnedItems.nodes;

        // Transform the data to match your expected format
        const transformedRepos = pinnedRepos.map(repo => ({
            name: repo.name,
            description: repo.description,
            updated_at: repo.updated_at,
            topics: repo.repositoryTopics.nodes.map(t => t.topic.name),
            url: repo.html_url
        }));

        // Returns the data as a JSON response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(transformedRepos)
        };
    } catch (error) {
        console.error("GraphQL request failed:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: "Failed to fetch pinned repositories",
                details: error.message 
            })
        };
    }
};