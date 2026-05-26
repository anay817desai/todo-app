# ✅ Serverless To-Do App — AWS Cloud Project

A fully serverless, cloud-native to-do web application built and deployed on Amazon Web Services (AWS). Features a live HTTPS frontend, REST API backend, NoSQL database, and a fully automated CI/CD pipeline that deploys on every GitHub push.

> 🌐 **Live Demo:** [https://your-cloudfront-url.cloudfront.net](https://d2ojurb55s1nxp.cloudfront.net/)

---

Lighthouse Link- https://pagespeed.web.dev/analysis/https-d2ojurb55s1nxp-cloudfront-net/8qxv6it1mk?form_factor=desktop

---

## 📸 Screenshot

![To-Do App Screenshot](screenshot.png)

---

## 🏗️ Architecture

```
User → CloudFront (HTTPS) → S3 (Frontend)
                          → API Gateway → Lambda → DynamoDB
```

| Layer | AWS Service | Purpose |
|-------|------------|---------|
| Frontend | Amazon S3 | Hosts HTML, CSS, JavaScript as a static website |
| CDN | Amazon CloudFront | Global HTTPS delivery with edge caching |
| API | Amazon API Gateway | REST endpoints — GET, POST, DELETE |
| Backend | AWS Lambda (Node.js) | Serverless business logic functions |
| Database | Amazon DynamoDB | NoSQL persistent storage |
| Security | AWS IAM | Least-privilege roles for Lambda |
| Pipeline | AWS CodePipeline | Automated CI/CD on every GitHub push |
| Build | AWS CodeBuild | Zips Lambda, syncs S3, invalidates CloudFront |

---

## ⚙️ Features

- ✅ Add, complete, and delete to-do items
- ✅ Data persists in DynamoDB — survives page refreshes
- ✅ Served globally over HTTPS via CloudFront CDN
- ✅ Fully serverless — no EC2 instances or servers to manage
- ✅ Automated CI/CD — push to GitHub and it deploys itself
- ✅ Lighthouse scores of 90+ across Performance, Accessibility, Best Practices and SEO
- ✅ Runs within AWS Free Tier — ~€0/month

---

## 📁 Project Structure

```
todo-app/
├── index.html          # Frontend — main page
├── style.css           # Frontend — styling
├── app.js              # Frontend — JavaScript logic
├── getTodos.mjs        # Lambda — fetch all to-dos
├── createTodo.mjs      # Lambda — create a new to-do
├── deleteTodo.mjs      # Lambda — delete a to-do
└── README.md           # This file
```

---

## 🚀 CI/CD Pipeline

Every commit to the `main` branch automatically:

1. **CodePipeline** detects the GitHub push within 30 seconds
2. **CodeBuild** zips and deploys all 3 Lambda functions
3. **CodeBuild** syncs updated frontend files to S3
4. **CodeBuild** invalidates the CloudFront cache
5. Live site is updated — no manual steps needed

```
GitHub Push → CodePipeline → CodeBuild → Lambda + S3 + CloudFront → Live
```

---

## 🛠️ AWS Services Used

- **Amazon S3** — static website hosting
- **Amazon CloudFront** — CDN with HTTPS (TLS)
- **AWS Lambda** — serverless Node.js functions
- **Amazon API Gateway** — REST API with CORS
- **Amazon DynamoDB** — NoSQL database
- **AWS IAM** — security roles and policies
- **AWS CodePipeline** — CI/CD orchestration
- **AWS CodeBuild** — build and deployment automation

---

## 📊 Lighthouse Scores

| Category | Score |
|----------|-------|
| ⚡ Performance | 90+ |
| ♿ Accessibility | 90+ |
| ✅ Best Practices | 95+ |
| 🔍 SEO | 90+ |

---

## 💰 Cost

This entire project runs within the **AWS Free Tier**:

| Service | Free Tier Limit | This Project |
|---------|----------------|--------------|
| S3 | 5 GB storage | ~0.01 MB |
| CloudFront | 1 TB transfer/month | Minimal |
| Lambda | 1,000,000 requests/month | Minimal |
| API Gateway | 1,000,000 calls/month | Minimal |
| DynamoDB | 25 GB storage | Minimal |

**Estimated monthly cost: ~€0.00**

---

## 🔧 How to Deploy Your Own Copy

### Prerequisites
- AWS account (free tier)
- GitHub account

### Step 1 — Set up DynamoDB
1. Create a table named `Todos`
2. Partition key: `userId` (String)
3. Sort key: `todoId` (String)

### Step 2 — Deploy Lambda functions
1. Create three Lambda functions: `getTodos`, `createTodo`, `deleteTodo`
2. Runtime: Node.js 20.x
3. Upload the corresponding `.mjs` files
4. Attach `AmazonDynamoDBFullAccess` IAM policy to each function role

### Step 3 — Create API Gateway
1. Create a REST API named `TodoAPI`
2. Create resource `/todos` with GET and POST methods
3. Create resource `/todos/{todoId}` with DELETE method
4. Enable CORS on all resources
5. Deploy to a stage named `prod`
6. Copy the Invoke URL

### Step 4 — Update app.js
Replace the `API_URL` value in `app.js` with your API Gateway Invoke URL

### Step 5 — Deploy frontend to S3
1. Create an S3 bucket with static website hosting enabled
2. Set bucket policy to allow public read
3. Upload `index.html`, `style.css`, `app.js`

### Step 6 — Set up CloudFront
1. Create a CloudFront distribution pointing to your S3 bucket
2. Set Default root object to `index.html`
3. Enable HTTPS redirect

### Step 7 — Set up CI/CD
1. Push all files to a GitHub repository
2. Create a CodePipeline connected to your GitHub repo
3. Add a build stage with the deployment commands
4. Grant the pipeline role Lambda, S3, and CloudFront permissions

---

## 🧪 Testing

| Test | How | Expected Result |
|------|-----|----------------|
| Site loads | Visit CloudFront URL | App loads with 🔒 padlock |
| Add to-do | Type and click Add | Item appears in list |
| Data persists | Add item, press F5 | Item still there after refresh |
| Delete works | Click Delete | Item removed permanently |
| API working | Visit API URL + `/todos` | JSON array returned |
| Pipeline works | Push a change to GitHub | Pipeline triggers automatically |

---

## 👨‍💻 Author

Built independently as a cloud infrastructure learning project demonstrating hands-on proficiency with AWS serverless architecture, CI/CD pipelines, and cloud-native deployment practices.

---

## 📄 License

MIT License — feel free to use this project as a reference or starting point.
