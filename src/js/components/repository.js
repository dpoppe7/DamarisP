// =====================================
// Repository class is the base class where Projects inherits from
// =====================================


export class Repository {
    constructor(name, description, updated_at, topics, html_url){
        this.name = name;
        this.description = description;
        this.updated_at = updated_at;
        this.topics = topics; // Array
        this.html_url = html_url;
    }

    getFormattedDate(){
        return new Date(this.updated_at).toLocaleDateString();
    }

    getTopicsDisplay(){
        if (this.topics.length > 0){
            return this.topics.join(', ');
        }
        else return 'No topics'
    }

    hasTopics(searchTopics){
        if (!Array.isArray(searchTopics)) searchTopics = [searchTopics];
        return searchTopics.some(topic =>
            this.topics.some(repoTopic =>
                repoTopic.toLowerCase().includes(topic.toLowerCase())
            )
        );
    }
}