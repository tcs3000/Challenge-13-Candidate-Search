// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    id: string; 
    name: string; 
    username: string; 
    location: string;
    avatar_url: string; 
    email: string;
    html_url: string; 
    company: string;
    bio?: string; 
  }