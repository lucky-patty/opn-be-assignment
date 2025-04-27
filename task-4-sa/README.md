# SA Assessment
This task is design the diagram for the assignment

## Task requirement
```
Design microservices architecture for MVP Instagram-like mobile application which supports following features.

Features
Content uploading - Photo and video should be resized and reformatting
Feeds - Sort the selected content to each user
Interaction - Like and comment at content also notify the content owner
Messaging - Generic chat system
Notification - Notify user on their phone and email
Analytics - Report content's view and interaction daily and send to owner email
Requirements
You need to consider the time-to-market as first priority, following with cost and extensibility.
Your architecture can contain real service provider, e.g.: AWS, GCP, Firebase etc.
The diagram should come with pros, cons, risks and extensibility.
Notes
Our expectation for this topic is to evaluate your architectural skills.
You are required to present this to the Engineering/Project/Business/Product/QA Team.
```
## My Diagram
![opn-be-sa v1](https://github.com/user-attachments/assets/6b4dfdce-cfde-48a2-891a-588869dc90ce)

### Key
1. This diagram focuses on time-effective for MVP deployment.
2. Some of the tech-stacks need to be changed when this app scales.

### Features
| Service | Purpose | Tech |
| ------- | ------- | -----|
| Content | Handle Videos / Photo | S3|
| User | Handler basic info | PostgreSQL in k8s|
| Interaction | Like, Comment, Notifiy | PostgreSQL + SNS|
| Feed | Sort / Feed | Redis + Elasticsearch|
| Notification | Notify | SNS |
| Message | Chat | Cassandra |
| Analytic | Track views, interaction | Firebase Analytics|
| Auth | Auth | Firebase|

### Pros
1. High scalable MVP
2. Very fast time MVP
### Cons
1. Costly when scales so we need to change some of the techstacks.
2. Sync data between each data storage.

### Extensibility
1. Kafka / SQS for event async process between services
2. Cloudwatch / Prometheus + Grafana
3. Separate each container into proper orchestration
4. CDN can be plus

### Risk
1. Coordination Between microservices
2. Debugging can be pain
3. SNS has its limitation
4. Cassandra can be very pain
