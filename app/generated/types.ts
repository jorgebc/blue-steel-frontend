export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** LocalDate type */
  LocalDate: any;
  /** LocalDateTime type */
  LocalDateTime: any;
  /** UUID type */
  UUID: any;
};

export type AuditMetadata = {
  __typename?: 'AuditMetadata';
  createdBy: User;
  creationDate: Scalars['LocalDateTime'];
  lastModifiedBy: User;
  lastModifiedDate: Scalars['LocalDateTime'];
};

export type Campaign = {
  __typename?: 'Campaign';
  actual: Scalars['Boolean'];
  auditingMetadata: AuditMetadata;
  description: Scalars['String'];
  id: Scalars['UUID'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  summaries: Maybe<Array<Maybe<Summary>>>;
  version: Scalars['Float'];
};

export type CreateCampaignInput = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
};

export type CreateCampaignPayload = {
  __typename?: 'CreateCampaignPayload';
  campaign: Campaign;
};

export type CreateCampaignSummaryInput = {
  campaignId: Scalars['UUID'];
  description: Scalars['String'];
  gameDate: Scalars['String'];
  name: Scalars['String'];
};

export type CreateCampaignSummaryPayload = {
  __typename?: 'CreateCampaignSummaryPayload';
  summary: Summary;
};

export type DeleteCampaignInput = {
  campaignId: Scalars['UUID'];
};

export type DeleteCampaignPayload = {
  __typename?: 'DeleteCampaignPayload';
  campaignId: Scalars['UUID'];
};

export type DeleteCampaignSummaryInput = {
  summaryId: Scalars['UUID'];
};

export type DeleteCampaignSummaryPayload = {
  __typename?: 'DeleteCampaignSummaryPayload';
  summaryId: Scalars['UUID'];
};

export type GetActualCampaignPayload = {
  __typename?: 'GetActualCampaignPayload';
  campaign: Campaign;
};

export type GetCampaignInput = {
  campaignId: Scalars['UUID'];
};

export type GetCampaignPayload = {
  __typename?: 'GetCampaignPayload';
  campaign: Campaign;
};

export type GetCampaignsPayload = {
  __typename?: 'GetCampaignsPayload';
  campaigns: Maybe<Array<Maybe<Campaign>>>;
};

export type GetSummaryPayload = {
  __typename?: 'GetSummaryPayload';
  summary: Summary;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: CreateCampaignPayload;
  createCampaignSummary: CreateCampaignSummaryPayload;
  deleteCampaign: DeleteCampaignPayload;
  deleteCampaignSummary: DeleteCampaignSummaryPayload;
  setActualCampaign: SetActualCampaignPayload;
  updateCampaign: UpdateCampaignPayload;
  updateCampaignSummary: UpdateCampaignSummaryPayload;
};


export type MutationCreateCampaignArgs = {
  input: CreateCampaignInput;
};


export type MutationCreateCampaignSummaryArgs = {
  input: CreateCampaignSummaryInput;
};


export type MutationDeleteCampaignArgs = {
  input: DeleteCampaignInput;
};


export type MutationDeleteCampaignSummaryArgs = {
  input: DeleteCampaignSummaryInput;
};


export type MutationSetActualCampaignArgs = {
  input: SetActualCampaignInput;
};


export type MutationUpdateCampaignArgs = {
  input: UpdateCampaignInput;
};


export type MutationUpdateCampaignSummaryArgs = {
  input: UpdateCampaignSummaryInput;
};

export type Query = {
  __typename?: 'Query';
  getActualCampaign: GetActualCampaignPayload;
  getCampaign: GetCampaignPayload;
  getCampaigns: GetCampaignsPayload;
  getSummary: GetSummaryPayload;
};


export type QueryGetCampaignArgs = {
  input: GetCampaignInput;
};

export type SetActualCampaignInput = {
  campaignId: Scalars['UUID'];
};

export type SetActualCampaignPayload = {
  __typename?: 'SetActualCampaignPayload';
  campaign: Campaign;
};

export type Summary = {
  __typename?: 'Summary';
  auditingMetadata: AuditMetadata;
  campaign: Campaign;
  description: Scalars['String'];
  gameDate: Scalars['LocalDate'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  version: Scalars['Float'];
};

export type UpdateCampaignInput = {
  description: Scalars['String'];
  id: Scalars['UUID'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['Float'];
};

export type UpdateCampaignPayload = {
  __typename?: 'UpdateCampaignPayload';
  campaign: Campaign;
};

export type UpdateCampaignSummaryInput = {
  campaignId: Scalars['UUID'];
  description: Scalars['String'];
  gameDate: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  version: Scalars['Int'];
};

export type UpdateCampaignSummaryPayload = {
  __typename?: 'UpdateCampaignSummaryPayload';
  summary: Summary;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
};
