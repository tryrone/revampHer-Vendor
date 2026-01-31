#!/usr/bin/env node

/**
 * Post-generation script to fix Apollo Client v4 hook imports in generated GraphQL types.
 * This script ensures that useMutation, useQuery, and useLazyQuery are imported
 * from '@apollo/client/react' and used directly instead of Apollo.useMutation.
 */

const fs = require('fs');
const path = require('path');

const generatedFile = path.join(__dirname, '../types/gqlReactTypings.generated.tsx');

if (!fs.existsSync(generatedFile)) {
  console.warn(`Generated file not found: ${generatedFile}`);
  process.exit(0);
}

let content = fs.readFileSync(generatedFile, 'utf8');

// Check if the import already exists
const hasHookImport = content.includes("import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react';");

// Add the import if it doesn't exist (after the Apollo import)
if (!hasHookImport) {
  const apolloImportIndex = content.indexOf("import * as Apollo from '@apollo/client';");
  if (apolloImportIndex !== -1) {
    const insertIndex = content.indexOf('\n', apolloImportIndex) + 1;
    content = content.slice(0, insertIndex) + 
              "import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react';\n" + 
              content.slice(insertIndex);
  }
}

// Replace Apollo.useMutation with useMutation
content = content.replace(/Apollo\.useMutation/g, 'useMutation');

// Replace Apollo.useQuery with useQuery
content = content.replace(/Apollo\.useQuery/g, 'useQuery');

// Replace Apollo.useLazyQuery with useLazyQuery
content = content.replace(/Apollo\.useLazyQuery/g, 'useLazyQuery');

fs.writeFileSync(generatedFile, content, 'utf8');
console.log('✓ Fixed Apollo Client v4 hook imports in generated file');
